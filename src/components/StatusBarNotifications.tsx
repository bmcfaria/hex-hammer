import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../helpers/theme';
import { NotificationType } from '../helpers/types';
import { deleteNotificationAction } from '../state/actions';
import { notificationsSelector } from '../state/selectors';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { CurrencyType } from '../helpers/types';

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.statusBarNotifications.background};
  border: 4px solid ${theme.colors.statusBarNotifications.border};
  color: black;
  padding: 8px;
`;

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const HexCurrency = styled(Hex)<{ $currency: CurrencyType }>`
  width: auto;
  height: 20px;
  margin: 0 4px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

interface NotificationProps {
  notification: NotificationType;
}

const Notification = ({ notification }: NotificationProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(deleteNotificationAction(notification.id));
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, notification.id]);

  // Only supported type yet
  if (notification.type !== 'inc_bonus') {
    return null;
  }

  return (
    <NotificationContainer>
      <div>BONUS</div>
      <CurrencyContainer>
        <div>+</div>
        <HexCurrency $currency={notification.currency as CurrencyType} />
        <div>{notification.value}</div>
      </CurrencyContainer>
    </NotificationContainer>
  );
};

const StatusBarNotifications = () => {
  const notifications = useSelector(notificationsSelector);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Container>
      {notifications.map((notification: NotificationType) => (
        <Notification notification={notification} key={notification.id} />
      ))}
    </Container>
  );
};

export default StatusBarNotifications;
