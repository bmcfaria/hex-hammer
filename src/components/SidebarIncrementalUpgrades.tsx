import UpgradeButton from './UpgradeButton';

type SidebarIncrementalUpgradesProps = {
  selectedHex: string;
};

const SidebarIncrementalUpgrades = ({
  selectedHex,
}: SidebarIncrementalUpgradesProps) => {
  return (
    <div>
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="interval" />
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="increment" />
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="auto" />
    </div>
  );
};

export default SidebarIncrementalUpgrades;
