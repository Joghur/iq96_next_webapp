import packageJson from '../../package.json';
import DynamicText from '../utility/DynamicText';

const AboutTab = () => {
  return (
    <>
      <DynamicText>
        <strong>{`IQ96 web app v${packageJson.version}`}</strong>
      </DynamicText>
      <ul className="flex flex-col gap-2 pt-2">
        <li>0.6.3 - Kortet virker nogenlunde som før</li>
        <li>0.6.2 - Omstrukturer hele siden og flytter den til app.iq96.dk</li>
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
