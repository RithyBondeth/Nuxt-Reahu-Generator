<script setup lang="ts">
import { LANDING_BLOCKS, LANDING_CLAIMS, LANDING_HERO, LANDING_MARQUEE } from '~/config/landing'
import { BLOCK_ORDER } from '~/core/blocks'

// The shell's titleTemplate appends the brand, so the home page keeps its own
// title untouched rather than repeating it.
useHead({ title: '' })

const blocksTitle = LANDING_BLOCKS.title.replace('{count}', String(BLOCK_ORDER.length))
</script>

<template>
  <div>
    <!--
      One orchestrated arrival rather than scattered effects: the words land
      first, then the eclipse blooms behind them and the brackets close in.
      Every step is a delay class, so nothing here depends on script.
    -->
    <section class="night relative overflow-hidden px-4 pb-24 pt-16 sm:pt-24">
      <div class="mx-auto max-w-3xl text-center">
        <p class="enter d-1 inline-flex items-center gap-2 rounded-full border border-default bg-elevated/50 px-3.5 py-1.5 text-xs text-muted backdrop-blur-sm">
          <span
            class="size-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          {{ LANDING_HERO.pill }}
        </p>

        <h1 class="display mt-7 text-5xl sm:text-7xl">
          <span class="enter d-2 block">{{ LANDING_HERO.title }}</span>
          <span class="enter d-3 text-gradient block">{{ LANDING_HERO.titleAccent }}</span>
        </h1>

        <p class="enter d-4 mx-auto mt-7 max-w-xl text-base text-muted sm:text-lg">
          {{ LANDING_HERO.description }}
        </p>

        <div class="enter d-5 mt-9 flex flex-wrap items-center justify-center gap-3">
          <UButton
            to="/build"
            label="Start building"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
            class="glow"
          />
          <UButton
            to="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme"
            target="_blank"
            label="What's a profile README?"
            icon="i-simple-icons-github"
            size="xl"
            color="neutral"
            variant="subtle"
          />
        </div>
      </div>

      <div class="mx-auto mt-20 max-w-4xl">
        <HeroEclipse />
      </div>
    </section>

    <UContainer class="pb-24">
      <section class="mt-4">
        <div class="text-center">
          <p class="eyebrow text-secondary">
            {{ LANDING_MARQUEE.eyebrow }}
          </p>
          <h2 class="display mt-3 text-2xl sm:text-3xl">
            {{ LANDING_MARQUEE.title }}
          </h2>
        </div>

        <TechMarquee class="mt-8" />
      </section>

      <section class="mt-24">
        <div
          v-reveal
          class="reveal"
        >
          <p class="eyebrow text-secondary">
            {{ LANDING_BLOCKS.eyebrow }}
          </p>
          <h2 class="display mt-3 text-3xl sm:text-4xl">
            {{ blocksTitle }}
          </h2>
          <p class="mt-3 max-w-xl text-muted">
            {{ LANDING_BLOCKS.description }}
          </p>
        </div>

        <BlockVocabulary class="mt-9" />
      </section>

      <section class="mt-24 grid gap-4 sm:grid-cols-3">
        <div
          v-for="(claim, index) in LANDING_CLAIMS"
          :key="claim.title"
          v-reveal="index * 90"
          class="reveal rounded-2xl border border-default bg-elevated/30 p-6"
        >
          <UIcon
            :name="claim.icon"
            class="size-5 text-primary"
          />
          <h3 class="mt-3.5 font-semibold">
            {{ claim.title }}
          </h3>
          <p class="mt-2 text-sm text-muted">
            {{ claim.description }}
          </p>
        </div>
      </section>

      <!-- The motif returns once at the close, at rest this time. -->
      <section
        v-reveal
        class="reveal corona night relative mt-24 overflow-hidden rounded-3xl bg-slate-950 px-6 py-16 text-center"
      >
        <div
          class="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div class="corona-halo aspect-square w-[70%] max-w-2xl rounded-full opacity-60" />
        </div>

        <div class="relative">
          <h2 class="display text-3xl text-white sm:text-5xl">
            Two minutes, start to commit
          </h2>
          <p class="mx-auto mt-4 max-w-md text-slate-300">
            Open the builder on a sensible default document and edit it down.
          </p>
          <UButton
            to="/build"
            label="Start building"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
            class="glow mt-9"
          />
        </div>
      </section>
    </UContainer>
  </div>
</template>
