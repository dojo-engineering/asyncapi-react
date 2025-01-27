import React from 'react';
import { Server as ServerType } from '@asyncapi/parser';

import { ServerSecurity } from './ServerSecurity';
import { Markdown, Schema, Bindings } from '../../components';

import { useConfig } from '../../contexts';
import { CommonHelpers, SchemaHelpers } from '../../helpers';

interface Props {
  serverName: string;
  server: ServerType;
}

export const Server: React.FunctionComponent<Props> = ({
  serverName,
  server,
}) => {
  const config = useConfig();

  if (!server) {
    return null;
  }

  const urlVariables = SchemaHelpers.serverVariablesToSchema(
    server.variables(),
  );
  const protocolVersion = server.protocolVersion();
  const serverRequirements = server.security();

  return (
    <div className="panel-item">
      <div className="panel-item--center px-8">
        <div className="p-4 border">
          <div>
            <span className="font-mono text-base">{server.url()}</span>
            <span className="bg-dojo-teal no-underline text-white uppercase rounded mx-2 px-2 py-1 text-sm">
              {protocolVersion
                ? `${server.protocol()} ${protocolVersion}`
                : server.protocol()}
            </span>
            <span className="bg-dojo-charcoal no-underline text-white uppercase rounded px-2 py-1 text-sm">
              {serverName}
            </span>
          </div>

          {server.hasDescription() && (
            <div className="mt-2">
              <Markdown>{server.description()}</Markdown>
            </div>
          )}

          {urlVariables && (
            <div
              className="mt-2"
              id={`${CommonHelpers.getIdentifier(
                `server-${serverName}-url-variables`,
                config,
              )}`}
            >
              <Schema
                schemaName="URL Variables"
                schema={urlVariables}
                expanded={true}
              />
            </div>
          )}

          {
            <div
              id={`${CommonHelpers.getIdentifier(
                `server-${serverName}-security`,
                config,
              )}`}
            >
              <ServerSecurity
                protocol={server.protocol()}
                serverRequirements={serverRequirements}
              />
            </div>
          }

          {server.hasBindings() && (
            <div className="mt-2">
              <Bindings
                name="Server specific information"
                bindings={server.bindings()}
              />
            </div>
          )}
        </div>
      </div>

      <div className="panel-item--right" />
    </div>
  );
};
