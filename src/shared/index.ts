export interface HighlightsSlide {
	id: number
	textLists: string[]
	video: string
	videoDuration: number
}

export interface Model {
	id: number
	title: string
	color: string[]
	img: string
}

export interface Size {
	label: string
	value: string
}

export interface VideoSettings {
	videoId: number
	isLastVideo: boolean
	isEnd: boolean
	startPlay: boolean
	isPlaying: boolean
}
