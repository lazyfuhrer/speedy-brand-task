import { useState } from 'react';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
  ListItem,
  Tag,
  TagLabel,
  Wrap,
  WrapItem,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const tagColors = ['blue', 'green', 'purple', 'yellow', 'orange'];

const TabsContainer = () => {
  const [tabData, setTabData] = useState([
    {
      tabName: 'Tab 1',
      topics: [
        {
          name: 'Topic 1',
          tags: ['Tag 1', 'Tag 2']
        },
        {
          name: 'Topic 2',
          tags: ['Tag 3', 'Tag 4']
        }
      ]
    },
    {
      tabName: 'Tab 2',
      topics: []
    },
    {
      tabName: 'Tab 3',
      topics: [
        {
          name: 'Topic 3',
          tags: ['Tag 5', 'Tag 6']
        },
        {
          name: 'Topic 4',
          tags: ['Tag 7', 'Tag 8']
        }
      ]
    },
    // Add more tabs as needed
  ]);

  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleAddTopic = () => {
    if (topicName && keywords) {
      const newTopic = {
        name: topicName,
        tags: keywords.split(',').map((keyword) => keyword.trim())
      };

      const updatedTabData = [...tabData];
      updatedTabData[1].topics.push(newTopic);

      setTabData(updatedTabData);
      setShowAddTopicModal(false);
      setTopicName('');
      setKeywords('');
    }
  };

  const handleDeleteTopic = (tabIndex, topicIndex) => {
    const updatedTabData = [...tabData];
    updatedTabData[tabIndex].topics.splice(topicIndex, 1);
    setTabData(updatedTabData);
  };

  return (
    <Box p={4} m={4}>
      <Tabs isLazy>
        <Flex alignItems="center" justifyContent="space-between" mb={4} p={2}>
          <TabList>
            {tabData.map((tab, index) => (
              <Tab key={index} _selected={{ color: 'teal.500', borderBottomColor: 'teal.500' }}>
                {tab.tabName}
              </Tab>
            ))}
          </TabList>
          <Button colorScheme="teal" size="sm" onClick={() => setShowAddTopicModal(true)}>
            Add topic
          </Button>
        </Flex>
        <TabPanels>
          {tabData.map((tab, tabIndex) => (
            <TabPanel key={tabIndex}>
              <UnorderedList>
                {tab.topics.map((topic, topicIndex) => (
                  <ListItem
                    key={topicIndex}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    bg="gray.100"
                    borderRadius="md"
                    mb={2}
                  >
                    <Box flex="1">
                      {topic.name}
                      <Wrap mt={1}>
                        {topic.tags.map((tag, tagIndex) => (
                          <WrapItem key={tagIndex}>
                            <Tag colorScheme={tagColors[tagIndex % tagColors.length]} variant="solid">
                              <TagLabel>{tag}</TagLabel>
                            </Tag>
                          </WrapItem>
                        ))}
                      </Wrap>
                    </Box>
                    <Button colorScheme="teal" size="sm">
                      Write
                    </Button>
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteTopic(tabIndex, topicIndex)}
                    >
                      <FaTrash />
                    </Button>
                  </ListItem>
                ))}
              </UnorderedList>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      <Modal isOpen={showAddTopicModal} onClose={() => setShowAddTopicModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Topic</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="topicName" mb={4}>
              <FormLabel>Topic Name</FormLabel>
              <Input
                placeholder="Enter topic name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </FormControl>
            <FormControl id="keywords" mb={4}>
              <FormLabel>Keywords</FormLabel>
              <Input
                placeholder="Enter keywords (comma-separated)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddTopic}>
              Save
            </Button>
            <Button variant="ghost" colorScheme="red" ml={2} onClick={() => setShowAddTopicModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TabsContainer;