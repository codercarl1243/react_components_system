import { IconProps, sizeMap } from './icon.type'

export default function Icon({
  icon: IconComponent,
  size = 'md',
  color = 'currentColor',
  variant,
  ...props
}: IconProps) {
  const resolvedSize =
    typeof size === 'string' && size in sizeMap
      ? sizeMap[size]
      : size

  const isDecorative = !(props['aria-label'] || props['aria-labelledby']);
  
  return (
    <IconComponent
      className="icon"
      width={resolvedSize}
      height={resolvedSize}
      color={color}
      aria-hidden={isDecorative ? 'true' : undefined}
      role={isDecorative ? undefined : 'img'}
      variant={variant}
      focusable="false"
      {...props}
    />
  )
}
