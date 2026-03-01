import { type FC } from 'react'

type SlidePrevSvgProps = {
	color?: string
	className?: string
}

export const SlidePrevDefaultSVG: FC<SlidePrevSvgProps> = ({ color = '#8D8D8D' }) => {
	return (
		<svg width='9' height='14' viewBox='0 0 9 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M-0.00300503 6.82319C-0.00300503 6.62325 0.103168 6.32323 0.315504 6.22326L6.68561 0.224937C7.00412 -0.074979 7.64113 -0.074979 8.06581 0.224937C8.38431 0.524853 8.38431 1.12473 8.06581 1.52462L2.33272 6.92314L8.06581 12.3217C8.38431 12.6216 8.38431 13.2213 8.06581 13.6212C7.7473 13.9211 7.11029 13.9211 6.68561 13.6212L0.315504 7.62289C0.103168 7.32298 -0.00300503 7.02313 -0.00300503 6.82319Z'
				fill={color}
			/>
		</svg>
	)
}
