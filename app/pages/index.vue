<script setup lang="ts">
import { LANDING_BLOCKS, LANDING_CLAIMS, LANDING_HERO, LANDING_MARQUEE } from '~/config/landing'
import { BLOCK_ORDER } from '~/core/blocks'

useHead({ title: '' })

const blocksTitle = LANDING_BLOCKS.title.replace('{count}', String(BLOCK_ORDER.length))
</script>

<template>
  <div>
    <section class="hero-grid overflow-hidden border-b border-default">
      <UContainer class="max-w-[90rem] py-20 sm:py-24 lg:py-24">
        <div class="mx-auto max-w-5xl text-center">
          <p class="enter d-1 mx-auto inline-flex items-center gap-2 rounded-full border border-default bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span
              class="status-dot"
              aria-hidden="true"
            />
            {{ LANDING_HERO.pill }}
          </p>

          <h1 class="display mx-auto mt-7 max-w-5xl text-5xl sm:text-7xl lg:text-[5.75rem]">
            <span class="enter d-2 block">{{ LANDING_HERO.title }}</span>
            <span class="enter d-3 text-gradient block">{{ LANDING_HERO.titleAccent }}</span>
          </h1>

          <p class="enter d-4 mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {{ LANDING_HERO.description }}
          </p>

          <div class="enter d-5 mt-9 flex flex-wrap items-center justify-center gap-3">
            <UButton
              to="/build"
              label="Open the builder"
              trailing-icon="i-lucide-arrow-up-right"
              size="xl"
            />
            <UButton
              to="https://github.com/RithyBondeth/Nuxt-Reahu-Generator"
              target="_blank"
              label="View source"
              icon="i-simple-icons-github"
              size="xl"
              color="neutral"
              variant="outline"
            />
          </div>
        </div>

        <div class="mx-auto mt-14 max-w-6xl">
          <ProductDemo />
        </div>
      </UContainer>
    </section>

    <section class="border-b border-default py-10">
      <UContainer class="max-w-[90rem]">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div class="min-w-64">
            <p class="eyebrow text-secondary">
              {{ LANDING_MARQUEE.eyebrow }}
            </p>
            <h2 class="mt-2 text-lg font-medium">
              {{ LANDING_MARQUEE.title }}
            </h2>
          </div>
          <TechMarquee class="min-w-0 flex-1" />
        </div>
      </UContainer>
    </section>

    <section
      id="blocks"
      class="scroll-mt-20 border-b border-default py-20 sm:py-28"
    >
      <UContainer class="max-w-[90rem]">
        <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div
            v-reveal
            class="reveal lg:sticky lg:top-28 lg:self-start"
          >
            <p class="eyebrow text-secondary">
              {{ LANDING_BLOCKS.eyebrow }}
            </p>
            <h2 class="display mt-4 text-4xl sm:text-5xl">
              {{ blocksTitle }}
            </h2>
            <p class="mt-5 max-w-md leading-7 text-muted">
              {{ LANDING_BLOCKS.description }}
            </p>
            <UButton
              to="/build"
              label="Explore every block"
              trailing-icon="i-lucide-arrow-right"
              color="neutral"
              variant="link"
              class="mt-5 px-0"
            />
          </div>
          <BlockVocabulary />
        </div>
      </UContainer>
    </section>

    <section class="border-b border-default">
      <UContainer class="max-w-[90rem]">
        <div class="grid md:grid-cols-3">
          <article
            v-for="(claim, index) in LANDING_CLAIMS"
            :key="claim.title"
            v-reveal="index * 70"
            class="reveal border-default py-10 md:border-r md:px-8 md:py-14 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
          >
            <div class="flex items-center justify-between">
              <UIcon
                :name="claim.icon"
                class="size-5 text-primary"
              />
              <span class="font-mono text-xs text-dimmed">0{{ index + 1 }}</span>
            </div>
            <h3 class="mt-8 text-lg font-semibold">
              {{ claim.title }}
            </h3>
            <p class="mt-2 max-w-sm text-sm leading-6 text-muted">
              {{ claim.description }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="hero-grid py-24 sm:py-32">
      <UContainer class="max-w-[90rem] text-center">
        <p class="eyebrow text-secondary">
          Ready when you are
        </p>
        <h2 class="display mx-auto mt-5 max-w-3xl text-4xl sm:text-6xl">
          Make the first impression yours.
        </h2>
        <p class="mx-auto mt-5 max-w-xl leading-7 text-muted">
          Begin with a useful profile, refine it block by block, and leave with plain Markdown.
        </p>
        <UButton
          to="/build"
          label="Start building"
          trailing-icon="i-lucide-arrow-up-right"
          size="xl"
          class="mt-8"
        />
      </UContainer>
    </section>
  </div>
</template>
