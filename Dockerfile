# Install dependencies only when needed
FROM node:16-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm ci

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npx prisma generate && npm run build

# RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs && chown -R nextjs:nodejs /app
# USER nextjs

EXPOSE 3000

CMD ["npm", "run", "prod"]