import { type FC } from 'react'

type SeparatorIconSVGProps = {
	color?: string
	className?: string
}

export const SeparatorIconSVG: FC<SeparatorIconSVGProps> = ({ color = 'white', className }) => {
	return (
		<svg
			className={className}
			width='25'
			height='32'
			viewBox='0 0 25 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M10.4947 16.1228L12.5 0L14.5037 16.1228L25 18.101L14.5037 20.0808L12.5 32L10.4947 20.0808L0 18.101L10.4947 16.1228Z'
				fill={color}
			/>
		</svg>
	)
}
