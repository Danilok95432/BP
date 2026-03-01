import { type FC } from 'react'

type SlideNextSvgProps = {
	color?: string
	className?: string
}

export const SlideNextDefaultSVG: FC<SlideNextSvgProps> = ({ color = '#8D8D8D' }) => {
	return (
		<svg width='9' height='14' viewBox='0 0 9 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M8.30769 7.02447C8.30769 7.22441 8.20152 7.52442 7.98918 7.6244L1.61907 13.6227C1.30057 13.9226 0.663553 13.9226 0.238879 13.6227C-0.0796264 13.3228 -0.0796264 12.7229 0.238879 12.323L5.97197 6.92452L0.238879 1.526C-0.0796264 1.22609 -0.0796264 0.626327 0.238879 0.226439C0.557385 -0.0734777 1.1944 -0.0734777 1.61907 0.226439L7.98918 6.22476C8.20152 6.52468 8.30769 6.82452 8.30769 7.02447Z'
				fill={color}
			/>
		</svg>
	)
}
