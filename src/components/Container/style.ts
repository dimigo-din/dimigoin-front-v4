import { styled } from "#/stitches.config";

export const containerCustom = (
  padding: string,
) => styled('div', {
  display: 'flex',
  position: 'relative',
  borderRadius: '1rem',
  backgroundColor: '#fff',
  padding: padding,
  overflow: 'auto',
  lineHeight: 2,
  variants: {
    column: {
      true: {
        flexDirection: 'column',
      }
    }
  },
});