import { motion } from 'framer-motion';

import DynamicText from '@components/utility/DynamicText';
import packageJson from '../../package.json';

const AnimatedDiv = () => {
  return (
    <div className="flex flex-row gap-1">
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%'],
        }}>
        0.6.3
      </motion.div>
      <div>{`-`}</div>
      <div>
        Kortet virker nogenlunde som før. Listen af steder er nu ordnet så det
        er lettere at finde IQ96 begivenheder. Animationer
      </div>
    </div>
  );
};

const AboutTab = () => {
  return (
    <div className="px-10">
      <DynamicText>
        <strong>{`IQ96 web app v${packageJson.version}`}</strong>
      </DynamicText>
      <div className="flex flex-col gap-2 pt-2 dynamic_text">
        <AnimatedDiv />
        <div>
          0.6.2 - Omstrukturer hele siden og flytter den til app.iq96.dk
        </div>
        <div>
          0.6.0 - Omdøbt Indstillinger til Med-lem, da der ikke er så meget at
          indstille - Opdateret Med-lems siden med tabs
        </div>
        <div>
          0.4.4 - Forbedret login oplevelse (mindre flimren) - check for om
          lokation er sat til
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
