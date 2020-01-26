import { Validator } from 'jsonschema';

//Schemas
import templateSchema from '../Schema/template';
import elementSchema from '../Schema/element';
import styleSchema from '../Schema/styles';

export default function validateTemplate(json) {
  const v = new Validator();
  v.addSchema(elementSchema, '/element');
  v.addSchema(styleSchema, '/styles');
  console.log(v.validate(json, elementSchema));
}
