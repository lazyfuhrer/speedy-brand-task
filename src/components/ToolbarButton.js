import { Button } from "@chakra-ui/react";

// ToolbarButton component
const ToolbarButton = ({ icon, label, active, onClick }) => (
  <Button
    size="sm"
    colorScheme={active ? 'teal' : undefined}
    mr={2}
    onClick={onClick}    
    variant={active ? 'solid' : 'ghost'}   
  >
    {icon || label}
  </Button>
);

export default ToolbarButton;