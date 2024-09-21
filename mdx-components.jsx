import * as mdxComponents from '@components/template/components/mdx'

export function useMDXComponents (components)
{
  return {
    ...components,
    ...mdxComponents,
  }
}
