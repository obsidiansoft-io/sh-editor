import { stringify } from 'himalaya';
/**
 *Convierte las propiedades css de la base de datos.
 * @param {String} css propiedad de css para javascript
 * @returns {String} propiedad de css
 */
export function parseCSS(css) {
  try {
    for (let i = 0; i < css.length; i++) {
      try {
        if (css[i] === css[i].toLocaleUpperCase()) {
          css = css.replace(css[i], `-${css[i].toLocaleLowerCase()}`);
        }
      } catch (styleError) {}
    }
    return css;
  } catch (error) {}
  return '';
}
/**
 *
 * @param {Object} prop properties
 * @returns  himalaya node => https://github.com/andrejewski/himalaya/blob/master/text/ast-spec-v1.md
 */
export function recursiveMap(prop) {
  let obj = {
      type: 'element',
      attributes: [],
      children: []
    },
    hasIcon = false,
    isCarousel = false;
  try {
    if (typeof prop['element_type'] !== 'undefined') {
      if (prop['element_type'] === 'icon') {
        hasIcon = true;
        prop['tagName'] = `fa-icon`;
      }
      if (prop['element_type'] === 'contact-me') {
        prop['tagName'] = 'form-contact';
      }
      if (prop['element_type'] === 'carousel') {
        let i = 0;
        prop['tagName'] = 'carousel-view';
        prop.children.map(e => {
          e.slot = i;
          i++;
        });
        isCarousel = true;
      }
      if (prop['element_type'] === 'stats') {
        //crea una función onClick para LitElement
        prop['@click'] = `${`${'${'}() => sendAction({action:'${
          prop['data']['action']
        }', source: '${prop['data']['source']}'})`}${'}'}`;
        delete prop['data'];
      }
    }
    Object.keys(prop).map(async (key, index) => {
      try {
        let value = '';
        switch (key) {
          case 'tagName':
            obj.tagName = prop[key];
            break;
          case 'children':
            prop[key].map(e => obj.children.push(recursiveMap(e)));
            break;
          case 'innerText':
            obj.children.push({
              type: 'text',
              content: prop[key]
            });
            break;
          case 'type':
            break;
          case 'style':
            //iteramos los estilos y los parseamos
            Object.keys(prop[key]).map((key2, index) => {
              if (key2 !== 'element_base') {
                value += parseCSS(key2) + `: ${prop[key][key2]};`;
              }
            });
            if (
              typeof prop['element_type'] !== 'undefined' &&
              prop['element_type'] === 'contact-me'
            ) {
              key = 'styles';
            }
            obj.attributes.push({
              key: key,
              value: value
            });
            break;
          case 'classList':
            for (let i = 0; i < prop[key].length; i++) {
              value += `${prop[key][i]}`;
              if (i < prop[key].length - 1) {
                value += ' ';
              }
            }
            obj.attributes.push({
              key: 'class',
              value: value
            });
            break;
          default:
            if (
              key !== 'allow_edit' &&
              key !== 'element_type' &&
              key !== 'element_base'
            ) {
              obj.attributes.push({
                key: key,
                value: `${prop[key]}`
              });
            } else if (key === 'element_type' && prop[key] === 'icon') {
              obj.tagName = `fa-icon`;
            } else if (key === 'element_type' && prop[key] === 'contact-me') {
              obj.tagName = `form-contact`;
            } else if (key === 'element_type' && prop[key] === 'carousel') {
              obj.tagName = `carousel-view`;
            }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return obj;
}
export function jsonConvert(prop) {
  let obj = {
      tagName: '',
      classList: [],
      style: {},
      children: []
    },
    hasIcon = false,
    isCarousel = false;
  try {
    Object.keys(prop).map(async (key, index) => {
      try {
        let value = '';
        switch (key) {
          case 'tagName':
            obj.tagName = prop[key];
            break;
          case 'children':
            prop[key].map(e => obj.children.push(jsonConvert(e)));
            break;
          case 'attributes':
            for (let attr of prop[key]) {
              obj[attr.key] = attr.value;
            }
            break;
          case 'type':
            break;
          case 'style':
            //iteramos los estilos y los parseamos
            Object.keys(prop[key]).map((key2, index) => {
              if (key2 !== 'element_base') {
                value += parseCSS(key2) + `: ${prop[key][key2]};`;
              }
            });
            if (
              typeof prop['element_type'] !== 'undefined' &&
              prop['element_type'] === 'contact-me'
            ) {
              key = 'styles';
            }
            obj.attributes.push({
              key: key,
              value: value
            });
            break;
          default:
            if (
              key !== 'allow_edit' &&
              key !== 'element_type' &&
              key !== 'element_base'
            ) {
              obj.attributes.push({
                key: key,
                value: `${prop[key]}`
              });
            } else if (key === 'element_type' && prop[key] === 'icon') {
              obj.tagName = `fa-icon`;
            } else if (key === 'element_type' && prop[key] === 'contact-me') {
              obj.tagName = `form-contact`;
            } else if (key === 'element_type' && prop[key] === 'carousel') {
              obj.tagName = `carousel-view`;
            }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (error) {
    console.log(error);
  }
  return obj;
}
export default function parser(content = {}) {
  let parsed = recursiveMap(content);
  return stringify([parsed]);
}