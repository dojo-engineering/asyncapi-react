import React from 'react';
import { Schema as SchemaType } from '@asyncapi/parser';

import { Schema as SchemaComponent } from '../../components';

interface Props {
  schemaName: string;
  schema: SchemaType;
}

export const Schema: React.FunctionComponent<Props> = ({
  schemaName,
  schema,
}) => {
  if (!schema) {
    return null;
  }

  return (
    <div>
      <div className="panel-item--center px-8">
        <div className="px-4 py-2 my-border-top">
          <SchemaComponent schemaName={schemaName} schema={schema} />
        </div>
      </div>

      <div className="w-full mt-4" />
    </div>
  );
};
