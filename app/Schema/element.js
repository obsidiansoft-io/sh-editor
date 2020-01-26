export default {
  id: '/element',
  type: 'object',
  properties: {
    id: { type: 'string' },
    element_type: { type: 'string' },
    classList: { type: 'array' },
    tagName: {
      type: 'string',
      required: true
    },
    style: {
      $ref: '/styles'
    },
    children: {
      type: 'array',
      items: {
        $ref: '/element'
      }
    }
  }
};
