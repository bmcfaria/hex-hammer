import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrenciesTypes } from '../helpers/types';
import { modalHex, ModalHexTypes } from '../helpers/values';
import { buyModalHexAction } from '../state/actions';
import { currencySelector, modalHexUpgradeSelector } from '../state/selectors';
import ModalItem from './ModalItem';

interface ModalExpandProps {
  modal: ModalHexTypes;
}

const ModalExpand = ({ modal }: ModalExpandProps) => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);

  const modalHexUpgradeValues = useSelector(modalHexUpgradeSelector);

  const buy = (index: number) => () => {
    if (modal) {
      dispatch(buyModalHexAction(modal, index));
    }
  };

  const modalInfo = modalHex[modal];
  if (!modalInfo || modalInfo.type !== 'expand') {
    return null;
  }

  return (
    <>
      {modalInfo.prices.map((_, index) => (
        <React.Fragment key={index}>
          <ModalItem
            text={`Expand lvl ${index + 1}`}
            price={modalInfo.prices[index]}
            onClick={buy(index)}
            bought={index < modalHexUpgradeValues[modal]}
            disabled={
              index > modalHexUpgradeValues[modal] ||
              // TODO: different feedback for insufficient currency
              currency[modalInfo.currency] < modalInfo.prices[index]
            }
            currency={modalInfo.currency as CurrenciesTypes}
          />
          <br />
        </React.Fragment>
      ))}
    </>
  );
};

export default ModalExpand;
