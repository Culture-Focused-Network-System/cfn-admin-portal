import { StyledTab, StyledTabs } from "./Tabs.styled";

interface TabsProps {
	tabs: string[];
	activeTab: string;
	onTabSelect: (value: string) => void;
}

const Tabs = ({ tabs, activeTab, onTabSelect }: TabsProps) => {
	return (
		<StyledTabs>
			{tabs.map((tab) => (
				<StyledTab
					key={tab}
					$active={activeTab === tab}
					onClick={() => onTabSelect(tab)}
				>
					{tab}
				</StyledTab>
			))}
		</StyledTabs>
	);
};

export default Tabs;
