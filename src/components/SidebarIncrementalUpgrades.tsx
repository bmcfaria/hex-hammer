import SidebarInfoButton from './SidebarInfoButton';
import UpgradeButton from './UpgradeButton';

type SidebarIncrementalUpgradesProps = {
  selectedHex: string;
  showInfo?: boolean;
};

const SidebarIncrementalUpgrades = ({
  selectedHex,
  showInfo,
}: SidebarIncrementalUpgradesProps) => {
  return (
    <div>
      {showInfo && <SidebarInfoButton selectedHex={selectedHex || ''} />}
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="interval" />
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="increment" />
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="auto" />
    </div>
  );
};

export default SidebarIncrementalUpgrades;
