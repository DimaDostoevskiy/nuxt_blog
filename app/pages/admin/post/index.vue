<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Админка',
})

const router = useRouter()

const {data: posts, pending, error: fetchError, refresh} = await useFetch<BlogPost[]>('/api/posts/get-all-admin')

const removePostClickHandler = async (id: number) => {
  if (!confirm('Удалить пост?')) {
    return
  }

  await $fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  } as Record<string, unknown>)

  await refresh()
}

const editPostClickHandler = (id: number) => {
  router.push(`/admin/post/edit/${String(id)}`)
}
</script>

<template>
  <LayoutDefaultSection :title="'Управление постами'">
    <template #section-controls>
      <KitButton to="/admin/post/create"
                 variant="primary"
                 text="Создать"
      />
    </template>
    <template #section-content>
      <KitAlert v-if="pending"
                :type="'success'"
                :title="`Загрузка данных...`"
                :text="`...`"
      />
      <KitAlert v-if="fetchError"
                :type="'error'"
                :title="`Ошибка!`"
                :text="String(fetchError)"
      />
      <div class="admin-page__list scroll">
        <PostCard
            class="mb-4"
            v-for="post in posts"
            :key="post.id"
            :post="post"
        >
          <template #controls>
            <div class="control__wrapper">
              <KitButton :text="'Редактировать'"
                         class="m-1"
                         :size="'sm'"
                         :variant="'success'"
                         :icon-right="`🔧`"
                         @click="editPostClickHandler(post.id)"
              />
              <KitButton :text="'Удалить пост'"
                         class="m-1"
                         :size="'sm'"
                         :variant="'danger'"
                         :icon-right="`🗑️`"
                         @click="removePostClickHandler(post.id)"
              />
            </div>
          </template>
        </PostCard>
      </div>
    </template>
  </LayoutDefaultSection>
</template>

<style scoped>
.control__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  min-width: 100%;
}

@media (max-width: 768px) {
  .control__wrapper {
    flex-direction: column;
  }
}
</style>
