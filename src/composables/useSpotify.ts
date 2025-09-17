import { SpotifyApi } from '@spotify/web-api-ts-sdk'

const spotify = SpotifyApi.withClientCredentials(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
)

export const useSpotify = () => {
  const trackIdFromUrl = (url: string) => {
    const regex = /track\/([a-zA-Z0-9]+)/
    const match = url.match(regex)
    return match ? match[1] : ''
  }

  const fetchTrackData = async (trackId: string) => {
    try {
      const track = await spotify.tracks.get(trackId)

      if (!track) return

      return {
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        imageUrl: track.album.images[0]?.url,
      }
    } catch (error) {
      console.error('Error fetching track data:', error)
    }
  }

  return {
    trackIdFromUrl,
    fetchTrackData,
  }
}

