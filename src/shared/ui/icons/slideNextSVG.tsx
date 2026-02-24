import { type FC } from 'react'
type SlideNextSvgProps = {
	color?: string
	className?: string
}

export const SlideNextSvg: FC<SlideNextSvgProps> = ({ color = '#000', className }) => {
	return (
		<svg
			className={className}
			width='27'
			height='54'
			viewBox='0 0 27 54'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M0.919998 0L1.09999 0.470001C3.3977 6.27357 6.85474 11.5476 11.2598 15.9699C15.6649 20.3921 20.9254 23.8697 26.72 26.19V27.12C20.9279 29.4398 15.6696 32.9161 11.2663 37.3366C6.86304 41.7571 3.40722 47.0289 1.11 52.83L0.929993 53.3L0 52.93L0.179993 52.47C2.4511 46.7296 5.8329 41.494 10.1315 37.0633C14.4301 32.6325 19.561 29.0938 25.23 26.65C19.5601 24.2076 14.4285 20.6694 10.1297 16.2385C5.83095 11.8075 2.44966 6.57119 0.179993 0.830002L0 0.370003L0.919998 0Z'
				fill={color}
			/>
		</svg>
	)
}
