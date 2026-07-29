<script setup lang="ts">
import { LANDING_BLOCKS, LANDING_CLAIMS, LANDING_HERO } from '~/config/landing'

// The shell's titleTemplate appends the brand, so the home page keeps its own
// title untouched rather than repeating it.
useHead({ title: '' })
</script>

<template>
  <div>
    <!--
      The artifact leads, the headline follows. Visitors see a real rendered
      README before they are told what the tool is — the header already names
      the product, so the headline can make a claim instead of an explanation.
    -->
    <section class="px-4 pb-16 pt-16 sm:pt-24">
      <p class="eyebrow mb-10 text-center text-primary">
        {{ LANDING_HERO.eyebrow }}
      </p>

      <HeroEclipse />

      <div class="mx-auto mt-14 max-w-2xl text-center">
        <!-- Two deliberate lines rather than a wrapped paragraph: the second
             sentence is the turn, and it should land on its own. -->
        <h1 class="display text-5xl sm:text-6xl">
          <span class="block">{{ LANDING_HERO.title }}</span>
          <span class="block text-muted">{{ LANDING_HERO.titleAccent }}</span>
        </h1>

        <p class="mx-auto mt-6 max-w-lg text-base text-muted sm:text-lg">
          {{ LANDING_HERO.description }}
        </p>

        <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
          <UButton
            to="/build"
            label="Start building"
            trailing-icon="i-lucide-arrow-right"
            size="xl"
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
    </section>

    <UContainer class="pb-20">
      <section>
        <p class="eyebrow text-secondary">
          {{ LANDING_BLOCKS.eyebrow }}
        </p>
        <h2 class="display mt-3 text-3xl sm:text-4xl">
          {{ LANDING_BLOCKS.title }}
        </h2>
        <p class="mt-3 max-w-xl text-muted">
          {{ LANDING_BLOCKS.description }}
        </p>

        <BlockVocabulary class="mt-8" />
      </section>

      <!-- A supporting band rather than a third pitch: the rule grounds it to
           the block grid above instead of leaving it floating. -->
      <section class="mt-20 grid gap-8 border-t border-default pt-12 sm:grid-cols-3">
        <div
          v-for="claim in LANDING_CLAIMS"
          :key="claim.title"
        >
          <UIcon
            :name="claim.icon"
            class="size-5 text-primary"
          />
          <h3 class="mt-3 font-semibold">
            {{ claim.title }}
          </h3>
          <p class="mt-2 text-sm text-muted">
            {{ claim.description }}
          </p>
        </div>
      </section>

      <section class="corona mt-20 overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center">
        <h2 class="display text-3xl text-white sm:text-4xl">
          Two minutes, start to commit
        </h2>
        <p class="mx-auto mt-3 max-w-md text-slate-300">
          Open the builder on a sensible default document and edit it down.
        </p>
        <UButton
          to="/build"
          label="Start building"
          trailing-icon="i-lucide-arrow-right"
          size="xl"
          class="mt-8"
        />
      </section>
    </UContainer>
  </div>
</template>
