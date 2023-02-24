import { RotatingLines } from 'react-loader-spinner';

import './Loading.css';

export const Loading: React.FC = () => {
  return (
    <div className="loader">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};
