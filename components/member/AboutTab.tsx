import { motion } from 'framer-motion';

import packageJson from '../../package.json';

const aboutList = [
  [
    '0.6.5',
    'Vores foreningskonto kontakter kan nu hentes (indtil videre kun af admin)',
  ],
  ['0.6.4', 'GDPR'],
  [
    '0.6.3',
    'Kortet virker nogenlunde som før. Listen af steder er nu ordnet så det er lettere at finde IQ96 begivenheder. Animationer',
  ],
  ['0.6.2', 'Omstrukturer hele siden og flytter den til app.iq96.dk'],
  [
    '0.4.4',
    'Forbedret login oplevelse (mindre flimren) - check for om lokation er sat til',
  ],
];

const AboutTab = () => {
  return (
    <div className="px-10">
      <div className="mb-3 dynamic_text">
        <strong>{`IQ96 web app v${packageJson.version}`}</strong>
      </div>
      {aboutList.map((o, index) => (
        <div key={index} className="flex flex-row gap-2 dynamic_text">
          {index === 0 && (
            <motion.div
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ['0%', '0%', '50%', '50%', '0%'],
              }}>
              {o?.[0]}
            </motion.div>
          )}
          {index !== 0 && <div>{o?.[0]}</div>}
          <div>{`-`}</div>
          <div>{o?.[1]}</div>
        </div>
      ))}
    </div>
  );
};

export default AboutTab;
