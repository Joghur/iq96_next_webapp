import { motion } from 'framer-motion';

import DynamicText from '@components/utility/DynamicText';
import packageJson from '../../package.json';

const AboutTab = () => {
  return (
    <div className="px-5">
      <DynamicText>
        <strong>{`IQ96 web app v${packageJson.version}`}</strong>
      </DynamicText>
      <motion.div
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
        className="flex flex-col gap-2 pt-2 dynamic_text">
        <div>
          0.6.3 -
          <div>
            Kortet virker nogenlunde som før. Listen af steder er nu ordnet så
            det er lettere at finde IQ96 begivenheder
          </div>
          <div>Animationer</div>
        </div>
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
      </motion.div>
    </div>
  );
};

export default AboutTab;
