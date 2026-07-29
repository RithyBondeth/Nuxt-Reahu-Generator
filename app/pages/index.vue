<script setup lang="ts">
import {
  LANDING_BLOCKS,
  LANDING_CLAIMS,
  LANDING_HERO,
  LANDING_MAKER,
  LANDING_MARQUEE
} from '~/config/landing'
import { BLOCK_ORDER } from '~/core/blocks'

useHead({ title: '' })

const blocksTitle = LANDING_BLOCKS.title.replace('{count}', String(BLOCK_ORDER.length))
</script>

<template>
  <div class="landing-page">
    <section class="landing-hero">
      <UContainer class="max-w-[96rem] py-14 sm:py-20 lg:py-24">
        <div class="grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div class="relative z-10 max-w-2xl">
            <p class="eyebrow enter d-1 flex items-center gap-2 text-muted">
              <span
                class="status-dot"
                aria-hidden="true"
              />
              {{ LANDING_HERO.pill }}
            </p>

            <h1 class="display mt-7 text-5xl sm:text-7xl lg:text-[5.4rem]">
              <span class="enter d-2 block">{{ LANDING_HERO.title }}</span>
              <span class="enter d-3 text-gradient block">{{ LANDING_HERO.titleAccent }}</span>
            </h1>

            <p class="enter d-4 mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {{ LANDING_HERO.description }}
            </p>

            <div class="enter d-5 mt-9 flex flex-wrap items-center gap-3">
              <UButton
                to="/build"
                label="Start composing"
                trailing-icon="i-lucide-arrow-right"
                size="xl"
                class="!rounded-sm"
              />
              <UButton
                to="https://github.com/RithyBondeth/Nuxt-Reahu-Generator"
                target="_blank"
                label="View on GitHub"
                icon="i-simple-icons-github"
                size="xl"
                color="neutral"
                variant="ghost"
                class="!rounded-sm"
              />
            </div>

            <dl class="hero-facts enter d-6 mt-12">
              <div>
                <dt>Blocks</dt>
                <dd>{{ BLOCK_ORDER.length }}</dd>
              </div>
              <div>
                <dt>Accounts</dt>
                <dd>None</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>README.md</dd>
              </div>
            </dl>
          </div>

          <div class="relative">
            <div
              class="hero-accent"
              aria-hidden="true"
            />
            <ProductDemo />
          </div>
        </div>
      </UContainer>
    </section>

    <section class="stack-band">
      <UContainer class="max-w-[96rem]">
        <div class="grid gap-5 py-7 lg:grid-cols-[18rem_1fr] lg:items-center">
          <div>
            <p class="eyebrow text-muted">
              {{ LANDING_MARQUEE.eyebrow }}
            </p>
            <h2 class="mt-1 text-sm font-medium">
              {{ LANDING_MARQUEE.title }}
            </h2>
          </div>
          <TechMarquee class="min-w-0 flex-1" />
        </div>
      </UContainer>
    </section>

    <section
      id="blocks"
      class="library-section scroll-mt-20 py-20 sm:py-28"
    >
      <UContainer class="max-w-[96rem]">
        <div
          v-reveal
          class="reveal mb-12 flex flex-col gap-6 border-b border-default pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p class="eyebrow text-muted">
              {{ LANDING_BLOCKS.eyebrow }}
            </p>
            <h2 class="display mt-4 max-w-3xl text-4xl sm:text-6xl">
              {{ blocksTitle }}
            </h2>
          </div>
          <div class="max-w-md lg:text-right">
            <p class="leading-7 text-muted">
              {{ LANDING_BLOCKS.description }}
            </p>
            <UButton
              to="/build"
              label="Open the full library"
              trailing-icon="i-lucide-arrow-right"
              color="neutral"
              variant="link"
              class="mt-3 px-0"
            />
          </div>
        </div>
        <BlockVocabulary />
      </UContainer>
    </section>

    <section class="principles-section">
      <UContainer class="max-w-[96rem] py-20 sm:py-24">
        <p class="eyebrow text-muted">
          Made to stay out of your way
        </p>
        <div class="mt-10 grid border-y border-default md:grid-cols-3">
          <article
            v-for="(claim, index) in LANDING_CLAIMS"
            :key="claim.title"
            v-reveal="index * 70"
            class="principle-card reveal"
          >
            <div class="flex items-center justify-between">
              <span class="font-mono text-xs text-dimmed">0{{ index + 1 }}</span>
              <UIcon
                :name="claim.icon"
                class="size-5 text-primary"
              />
            </div>
            <h3 class="mt-16 text-xl font-semibold">
              {{ claim.title }}
            </h3>
            <p class="mt-3 max-w-sm text-sm leading-6 text-muted">
              {{ claim.description }}
            </p>
          </article>
        </div>
      </UContainer>
    </section>

    <section
      id="maker"
      class="maker-section"
    >
      <UContainer class="max-w-[96rem] py-20 sm:py-24">
        <div
          v-reveal
          class="maker-grid reveal"
        >
          <div class="maker-intro">
            <div class="flex items-center justify-between">
              <p class="eyebrow text-muted">
                Independent project
              </p>
              <span class="font-mono text-xs text-dimmed">04 / 04</span>
            </div>

            <div class="maker-signature">
              <span aria-hidden="true">RB</span>
              <div>
                <p class="text-sm text-muted">
                  Designed and developed by
                </p>
                <h2 class="display mt-2 text-4xl sm:text-6xl">
                  {{ LANDING_MAKER.name }}
                </h2>
              </div>
            </div>

            <p class="mt-8 max-w-2xl text-base leading-7 text-muted">
              {{ LANDING_MAKER.description }}
            </p>

            <div class="maker-meta mt-8">
              <span>{{ LANDING_MAKER.role }}</span>
              <span>{{ LANDING_MAKER.location }}</span>
              <span>Building in public</span>
            </div>
          </div>

          <aside class="maker-support">
            <div>
              <UIcon
                name="i-lucide-coffee"
                class="size-6 text-primary"
              />
              <p class="eyebrow mt-7 text-muted">
                Keep Reahu growing
              </p>
              <h3 class="mt-3 text-2xl font-semibold">
                Saved you some time?
              </h3>
              <p class="mt-3 text-sm leading-6 text-muted">
                Reahu is free and local-first. A coffee helps fund new blocks, templates, and careful improvements.
              </p>
            </div>

            <div class="mt-8 grid gap-2">
              <UButton
                :to="LANDING_MAKER.coffeeUrl"
                target="_blank"
                label="Buy me a coffee"
                icon="i-simple-icons-buymeacoffee"
                trailing-icon="i-lucide-arrow-up-right"
                size="lg"
                class="justify-center !rounded-sm"
              />
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  :to="LANDING_MAKER.portfolioUrl"
                  target="_blank"
                  label="Portfolio"
                  icon="i-lucide-globe-2"
                  color="neutral"
                  variant="outline"
                  class="justify-center !rounded-sm"
                />
                <UButton
                  :to="LANDING_MAKER.githubUrl"
                  target="_blank"
                  label="GitHub"
                  icon="i-simple-icons-github"
                  color="neutral"
                  variant="outline"
                  class="justify-center !rounded-sm"
                />
              </div>
            </div>
          </aside>
        </div>
      </UContainer>
    </section>

    <section class="final-cta">
      <UContainer class="max-w-[96rem] py-16 sm:py-24">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p class="eyebrow text-[#111111]/60">
              Your profile, your voice
            </p>
            <h2 class="display mt-5 max-w-4xl text-4xl text-[#111111] sm:text-6xl">
              Make a README people remember.
            </h2>
          </div>
          <UButton
            to="/build"
            label="Build your profile"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
            color="neutral"
            variant="solid"
            class="!rounded-sm"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
