import { styled } from "#/stitches.config";

export const containerCustom = (
  padding: string,
) => styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: '1rem',
  backgroundColor: '#fff',
  padding: padding,
});