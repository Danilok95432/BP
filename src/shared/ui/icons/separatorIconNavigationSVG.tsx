import { type FC } from 'react'

type SeparatorIconSVGProps = {
	color?: string
	className?: string
}

export const SeparatorIconNavigationSVG: FC<SeparatorIconSVGProps> = ({
	color = '#3D4BC2',
	className,
}) => {
	return (
		<svg width='19' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M7.97597 8.06141L9.5 0L11.0228 8.06141L19 9.0505L11.0228 10.0404L9.5 16L7.97597 10.0404L0 9.0505L7.97597 8.06141Z'
				fill='#3D4BC2'
			/>
		</svg>
	)
}
