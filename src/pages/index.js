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
import { FaTrash, FaRegEdit, FaBold, FaItalic, FaUnderline, FaStrikethrough } from 'react-icons/fa';
import {
  Editor as Edit,
  EditorState,
  RichUtils,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js/dist/Draft.css';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const tagColors = ['blue', 'green', 'purple', 'yellow', 'orange'];

const TabsContainer = () => {
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tabs, setTabs] = useState([
    {
      name: 'All',
      topics: [
        {
          name: 'The importance of establishing a Strong Online Presence for Small Businesses',
          tags: ['online presence', 'small businesses', 'digital marketing', 'branding'],
        },
        {
          name: 'How fast Turnaround Times in logo and website design can help your business',
          tags: ['fast turnaround', 'logo design', 'website design', 'branding'],
        },
        {
          name: 'Affordable branding solutions for startups and entrepreneurs',
          tags: ['affordable branding', 'startups', 'entrepreneurs', 'logo design', 'website design'],
        },
        {
          name: 'The Benifits of Compreshensive Branding services for Small to Medium-sized Businesses',
          tags: ['compreshensive Branding', 'small businesses', 'logo design', 'website design', 'social media engagement'],
        },
        {
          name: 'Expert tips for choosing the right digital marketing agency for your business',
          tags: ['digital marketing agency', 'tips','branding', 'website design', 'social media engagement'],
        },
      ],
    },
    {
      name: 'Custom',
      topics: [
        {
          name: 'The importance of establishing a Strong Online Presence for Small Businesses',
          tags: ['online presence', 'small businesses', 'digital marketing', 'branding'],
        },
      ],
    },
    // Add more tabs here
    {
      name: 'ICP',
      topics: [
        {
          name: 'The importance of establishing a Strong Online Presence for Small Businesses',
          tags: ['online presence', 'small businesses', 'digital marketing', 'branding'],
        },
        {
          name: 'How fast Turnaround Times in logo and website design can help your business',
          tags: ['fast turnaround', 'logo design', 'website design', 'branding'],
        },
      ],
    },
    {
      name: 'Mission',
      topics: [
        {
          name: 'The importance of establishing a Strong Online Presence for Small Businesses',
          tags: ['online presence', 'small businesses', 'digital marketing', 'branding'],
        },
        {
          name: 'How fast Turnaround Times in logo and website design can help your business',
          tags: ['fast turnaround', 'logo design', 'website design', 'branding'],
        },
        {
          name: 'Affordable branding solutions for startups and entrepreneurs',
          tags: ['affordable branding', 'startups', 'entrepreneurs', 'logo design', 'website design'],
        },
      ],
    },
    {
      name: 'Product',
      topics: [
        {
          name: 'The importance of establishing a Strong Online Presence for Small Businesses',
          tags: ['online presence', 'small businesses', 'digital marketing', 'branding'],
        },
        {
          name: 'How fast Turnaround Times in logo and website design can help your business',
          tags: ['fast turnaround', 'logo design', 'website design', 'branding'],
        },
        {
          name: 'Affordable branding solutions for startups and entrepreneurs',
          tags: ['affordable branding', 'startups', 'entrepreneurs', 'logo design', 'website design'],
        },
        {
          name: 'The Benifits of Compreshensive Branding services for Small to Medium-sized Businesses',
          tags: ['compreshensive Branding', 'small businesses', 'logo design', 'website design', 'social media engagement'],
        },
      ],
    },
  ]);

  const handleDeleteTopic = (tabIndex, topicIndex) => {
    const updatedTabs = [...tabs];
    updatedTabs[tabIndex].topics.splice(topicIndex, 1);
    setTabs(updatedTabs);
  };

  const handleAddTopic = () => {
    const newTopic = {
      name: topicName,
      tags: keywords.split(',').map((keyword) => keyword.trim()),
    };
    const updatedTabs = [...tabs];
    updatedTabs[1].topics.push(newTopic); // Add the new topic to the second tab
    setTabs(updatedTabs);
    setShowAddTopicModal(false);
    setTopicName('');
    setKeywords('');
  };

  const handleWrite = () => {
    setShowBlogEditor(true);
  };

  const handleCloseBlogEditor = () => {
    setShowBlogEditor(false);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleToggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleToggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const convertToRawContent = (editorState) => {
    const contentState = editorState.getCurrentContent();
    return convertToRaw(contentState);
  };

  const convertFromRawContent = (rawContentState) => {
    const contentState = convertFromRaw(rawContentState);
    return EditorState.createWithContent(contentState);
  };

  return (
    <Box p={4} m={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <Tabs isLazy>
        <Flex alignItems="center" justifyContent="space-between" mb={4} p={2} borderWidth="1px" borderRadius="md" borderStyle="solid" borderColor="gray.200">
          <TabList>
            {tabs.map((tab, index) => (
              <Tab key={index} _selected={{ color: 'teal.500', borderBottomColor: 'teal.500' }} borderWidth="1px" borderRadius="md" borderStyle="solid" borderColor="gray.200">
                {tab.name}
              </Tab>
            ))}
          </TabList>
          <Button colorScheme="teal" size="sm" onClick={() => setShowAddTopicModal(true)}>
            Add topic
          </Button>
        </Flex>
        <TabPanels>
          {tabs.map((tab, tabIndex) => (
            <TabPanel key={tabIndex}>
              <UnorderedList borderWidth="1px" borderRadius="md" borderStyle="solid" borderColor="gray.200">
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
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="gray.200"
                    _last={{ mb: 0 }}
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
                    <Button
                      colorScheme="red"
                      size="sm"
                      mr={2}
                      onClick={() => handleDeleteTopic(tabIndex, topicIndex)}
                    >
                      <FaTrash />
                    </Button>
                    <Button colorScheme="teal" size="sm" onClick={handleWrite}>
                      <FaRegEdit />
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
            <FormControl mb={4}>
              <FormLabel>Topic Name</FormLabel>
              <Input
                placeholder="Enter topic name"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Keywords</FormLabel>
              <Input
                placeholder="Enter keywords (comma-separated)"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddTopic}>
              Add Topic
            </Button>
            <Button variant="ghost" colorScheme="red" onClick={() => setShowAddTopicModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={showBlogEditor} onClose={handleCloseBlogEditor} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Blog Editor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" mb={2}>
              <ToolbarButton
                icon={<FaBold />}
                active={editorState.getCurrentInlineStyle().has('BOLD')}
                onClick={() => handleToggleInlineStyle('BOLD')}
              />
              <ToolbarButton
                icon={<FaItalic />}
                active={editorState.getCurrentInlineStyle().has('ITALIC')}
                onClick={() => handleToggleInlineStyle('ITALIC')}
              />
              <ToolbarButton
                icon={<FaUnderline />}
                active={editorState.getCurrentInlineStyle().has('UNDERLINE')}
                onClick={() => handleToggleInlineStyle('UNDERLINE')}
              />
              <ToolbarButton
                icon={<FaStrikethrough />}
                active={editorState.getCurrentInlineStyle().has('STRIKETHROUGH')}
                onClick={() => handleToggleInlineStyle('STRIKETHROUGH')}
              />
              <ToolbarButton
                label="H1"
                active={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-one'}
                onClick={() => handleToggleBlockType('header-one')}
              />
              <ToolbarButton
                label="H2"
                active={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'header-two'}
                onClick={() => handleToggleBlockType('header-two')}
              />
              <ToolbarButton
                label="Blockquote"
                active={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'blockquote'}
                onClick={() => handleToggleBlockType('blockquote')}
              />
              <ToolbarButton
                label="UL"
                active={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'unordered-list-item'}
                onClick={() => handleToggleBlockType('unordered-list-item')}
              />
              <ToolbarButton
                label="OL"
                active={editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType() === 'ordered-list-item'}
                onClick={() => handleToggleBlockType('ordered-list-item')}
              />
            </Flex>
            <Box border="1px solid #E2E8F0" borderRadius="md" minHeight="200px" p={2}>
              <Editor
                editorState={editorState}
                onChange={handleEditorChange}
                plugins={[imagePlugin]}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCloseBlogEditor}>
              Generate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

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

export default TabsContainer;