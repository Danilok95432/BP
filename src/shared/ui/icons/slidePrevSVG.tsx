import { type FC } from 'react'

type SlidePrevSvgProps = {
	color?: string
	className?: string
}

export const SlidePrevSvg: FC<SlidePrevSvgProps> = ({ color = '#000', className }) => {
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
				d='M25.8 53.3L25.62 52.83C23.3223 47.0264 19.8653 41.7524 15.4602 37.3301C11.0551 32.9079 5.79457 29.4303 0 27.11V26.18C5.79208 23.8602 11.0504 20.3839 15.4537 15.9634C19.857 11.5429 23.3128 6.27107 25.61 0.469999L25.79 0L26.72 0.369999L26.54 0.83C24.2689 6.57035 20.8871 11.806 16.5885 16.2367C12.2899 20.6675 7.15899 24.2062 1.49001 26.65C7.15986 29.0924 12.2915 32.6306 16.5903 37.0615C20.8891 41.4925 24.2703 46.7288 26.54 52.47L26.72 52.93L25.8 53.3Z'
				fill={color}
			/>
		</svg>
	)
}
