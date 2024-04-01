import React from 'react';

import { INITIAL_STEPS } from '@/InitialSteps';
import { Main } from '@/components/UI/Main';
import { useUserStore } from '@/store/useUserStore';
import { UserDataType } from '@/types/types';

function PersonalReferencesIntro() {
  const { userData } = useUserStore((state) => state);
  const userDataEntries: [string, UserDataType][] = Object.entries(userData);
  const sortedUserData = userDataEntries.sort(
    (a, b) => (b[1].strength || 0) - (a[1].strength || 0)
  );
  const topThreeUserData = sortedUserData.slice(0, 3);

  const renderElement = (element: [string, UserDataType]) => {
    console.log(element);
    const index = Number(element[0]);

    return (
      <div>
        <img src={INITIAL_STEPS[index].image} alt="test" />
        {/* <p>{JSON.stringify()}</p> */}
        <p>{element[1].strength}</p>
        <div>
          {element[1].checkedFeelings &&
            element[1].checkedFeelings.map((feeling) => (
              <span key={feeling}>{feeling}</span>
            ))}
        </div>
      </div>
    );
  };

  return (
    <Main>{topThreeUserData.map((element) => renderElement(element))}</Main>
  );
}

// eslint-disable-next-line import/no-default-export
export default PersonalReferencesIntro;
