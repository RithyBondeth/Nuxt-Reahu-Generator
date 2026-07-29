<script setup lang="ts">
import { LANDING_FEATURES, LANDING_HERO } from '~/config/landing'

const HERO_LINKS = [
  {
    label: 'Start building',
    to: '/build',
    trailingIcon: 'i-lucide-arrow-right',
    size: 'xl' as const
  },
  {
    label: 'What is a profile README?',
    to: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme',
    target: '_blank' as const,
    icon: 'i-simple-icons-github',
    size: 'xl' as const,
    color: 'neutral' as const,
    variant: 'subtle' as const
  }
]

const CTA_LINKS = [
  {
    label: 'Open the builder',
    to: '/build',
    trailingIcon: 'i-lucide-arrow-right',
    color: 'neutral' as const
  }
]
</script>

<template>
  <div>
    <UPageHero
      :title="LANDING_HERO.title"
      :description="LANDING_HERO.description"
      :links="HERO_LINKS"
    />

    <UPageSection
      id="features"
      title="Composable, not a fill-in-the-blanks form"
      description="The README is an ordered list of blocks you reorder, duplicate, and drop. That is the whole data model — which is why everything else falls out of it for free."
      :features="LANDING_FEATURES"
    />

    <UPageSection>
      <UPageCTA
        title="Takes about two minutes"
        description="Start from a sensible default document and edit from there."
        variant="subtle"
        :links="CTA_LINKS"
      />
    </UPageSection>
  </div>
</template>
