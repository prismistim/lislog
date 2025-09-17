<script setup lang="ts">
import { ref } from 'vue'
import { useSpotify } from './composables/useSpotify'

const spotify = useSpotify()
const preview = ref<HTMLElement | null>(null)
const trackUrl = ref('')
const lastFetchUrl = ref('')
const trackMetadata = ref({
  name: '',
  artist: '',
  imageUrl: '',
})
const note = ref('')
const name = ref('')

const fetchTrack = async () => {
  lastFetchUrl.value = trackUrl.value

  const trackId = spotify.trackIdFromUrl(trackUrl.value)
  if (!trackId) {
    return
  }

  const metadata = await spotify.fetchTrackData(trackId)
  if (!metadata) {
    return
  }

  trackMetadata.value = metadata
}
</script>

<template>
  <header class="mt-4 text-center">
    <h1 class="text-2xl">lislog</h1>
    <p>taking note with Spotify musics.</p>
  </header>
  <main class="container max-w-[640px] mt-4 mb-12 mx-auto">
    <section>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Spotify URL</legend>
        <input v-model="trackUrl" type="text" class="input w-full" placeholder="https://open.spotify.com/track/xxx" />
      </fieldset>
      <button class="btn btn-primary mt-2 w-full" :disabled="lastFetchUrl === trackUrl" @click="fetchTrack">Get track data</button>
      <fieldset class="fieldset mt-2">
        <legend class="fieldset-legend">Note</legend>
        <textarea v-model="note" class="textarea w-full" rows="6" placeholder="Write your note here..."></textarea>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">User ID</legend>
        <input v-model="name" type="text" class="input w-full" placeholder="snosph" />
      </fieldset>
    </section>
    <section class="mt-12">
      <div v-if="trackMetadata.name">
        <figure ref="preview" v-if="trackMetadata.imageUrl" class="px-4 pt-4">
          <div class="relative w-full h-148 border-1 border-neutral-200 bg-center bg-no-repeat bg-[image:var(--image-url)]" :style="{ '--image-url': `url(${trackMetadata.imageUrl})` }">
            <!-- <div class="absolute z-0 w-96 h-96 bg-center bg-no-repeat bg-[image:var(--image-url)]" :style="{ '--image-url': `url(${trackMetadata.imageUrl})` }"></div> -->
            <div class="absolute -z-10 h-full w-full blur-lg bg-center bg-no-repeat bg-[image:var(--image-url)]" :style="{ '--image-url': `url(${trackMetadata.imageUrl})` }"></div>
            <div class="flex h-full p-12 items-end">
              <div class="p-4 text-neutral-900 font-medium tracking-wider text-balance shadow-lg shadow-white bg-white/60 backdrop-blur-xl backdrop-brightness-400 backdrop-contrast-90 -rotate-12">
                <p class="text-3xl/10 ">"{{ note }}" <span class="text-sm text-sky-500">@{{ name }}</span></p>
                <h3 class="border-t border-neutral-700/50 mt-3 p-1">{{ trackMetadata.artist }} - {{ trackMetadata.name }}</h3>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </section>
  </main>
</template>
