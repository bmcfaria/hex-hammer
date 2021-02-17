import UpgradeButton from './UpgradeButton';

type SidebarIncrementalUpgradesProps = {
  selectedHex: string;
};

const SidebarIncrementalUpgrades = ({
  selectedHex,
}: SidebarIncrementalUpgradesProps) => {
  return (
    <div>
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="auto" />
      <UpgradeButton selectedHex={selectedHex || ''} upgradeId="increment" />
    </div>
  );
};

export default SidebarIncrementalUpgrades;
