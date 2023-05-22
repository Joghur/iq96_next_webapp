'use client';

import packageJson from '../../package.json';
import DynamicText from '../utility/DynamicText';

const AboutTab = () => {
  return (
    <>
      <DynamicText>
        <strong>{`IQ96 web app v${packageJson.version}`}</strong>
      </DynamicText>
      <ul>
        <li>
          0.6.0 - Omdøbt Indstillinger til Med-lem, da der ikke er så meget at
          indstille - Opdateret Med-lems siden med tabs
        </li>
        <li>
          0.4.4 - Forbedret login oplevelse (mindre flimren) - check for om
          lokation er sat til
        </li>
      </ul>
    </>
  );
};

export default AboutTab;
