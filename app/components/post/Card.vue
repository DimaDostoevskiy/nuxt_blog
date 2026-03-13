<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

type BlogPostWithImage = BlogPost & {
  image?: string | null
  imageUrl?: string | null
  cover?: string | null
}

const props = defineProps({
  post: {
    type: Object as () => BlogPost,
    required: true
  }
})

const placeholderImageSrc = 'https://placehold.co/1200x620/222222/fafafa?text=Post+image'
const isImageBroken = ref(false)

const displayImageSrc = computed(() => {
  const postWithImage = props.post as BlogPostWithImage
  return postWithImage.image?.trim()
      || postWithImage.imageUrl?.trim()
      || postWithImage.cover?.trim()
      || placeholderImageSrc
})

watch(() => props.post.id, () => {
  isImageBroken.value = false
})

const handleImageError = () => {
  isImageBroken.value = true
}
</script>

<template>
  <div class="post-card">
    <div class="post-card__media">
      <KitImage v-if="displayImageSrc && !isImageBroken"
                class="mb-4"
                :src="displayImageSrc"
                :alt="`Изображение к посту: ${post.title}`"
                loading="lazy"
                @error="handleImageError"
      />
      <div v-else class="post-card__media-fallback mb-4">Нет изображения</div>
      <KitButton
          :to="`/${props.post.slug}`"
          :fullWidth="true"
          variant="primary"
          size="sm"
          text="Перейти на страницу"
      />
    </div>
    <div class="post-card__body">
      <h2 class="post-card__title">{{ post.title }}</h2>
      <p class="post-card__description">{{ post.description }}</p>
      <div class="post-card__content" v-html="post.content"/>
    </div>
    <slot name="controls"/>
  </div>
</template>

<style scoped>
.post-card {
  position: relative;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  display: grid;
  gap: 10px;
  overflow: hidden;
  transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}

.post-card:hover {
  border-color: rgb(var(--color-primary-rgb) / 0.88);
  box-shadow: 3px 3px 3px 3px rgb(var(--color-primary-rgb) / 0.24), 0 16px 34px rgb(var(--color-primary-rgb) / 0.3);
}

.post-card__media {
  position: relative;
  display: grid;
}

.post-card__media-fallback {
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  color: var(--color-muted);
  font-weight: 600;
}

.post-card__body {
  display: grid;
  gap: 1px;
  padding-inline: 6px;
  height: 160px;
}

.post-card__title {
  font-size: clamp(20px, 2.2vw, 26px);
  letter-spacing: -0.25px;
  line-height: 1.22;
  font-weight: 800;
  color: var(--color-text);
  text-wrap: balance;
}

.post-card__description {
  margin: 0;
  color: rgba(250, 250, 250, 0.72);
  font-size: 15px;
  line-height: 1.6;
  max-width: 78ch;
}

.post-card__content {
  position: relative;
  color: rgba(250, 250, 250, 0.88);
  font-size: 15px;
  line-height: 1.7;
  letter-spacing: normal;
  height: 60px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 48%, transparent 100%);
  overflow-wrap: anywhere;
}

.post-card__content::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 26px;
  pointer-events: none;
  background: linear-gradient(
      to bottom,
      rgba(22, 22, 22, 0),
      rgba(22, 22, 22, 0.72)
  );
}

.post-card__footer {
  width: 100%;
  height: fit-content;
  margin: 10px -14px -14px -14px;
  padding: 12px 14px;
  background: rgb(var(--color-bg-rgb));
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  border-top: 1px solid rgb(var(--color-border-rgb) / 0.2);
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 900px) {
  .post-card {
    padding: 12px;
  }

  .post-card__body {
    height: auto;
    gap: 8px;
  }

  .post-card__content {
    height: auto;
    max-height: 88px;
  }
}

@media (max-width: 560px) {
  .post-card__title {
    font-size: clamp(18px, 6vw, 22px);
  }
}
</style>
