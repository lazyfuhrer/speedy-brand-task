import { useRef, useState } from 'react';
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
  useToast,
  Text,
  Heading,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaTrash, FaRegEdit, FaBold, FaItalic, FaUnderline, FaStrikethrough, FaPlus, FaImage } from 'react-icons/fa';
import {
  Editor as Edit,
  EditorState,
  RichUtils,
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js/dist/Draft.css';
import ToolbarButton from '@/components/ToolbarButton';
import { TabsData } from '@/constant/TabsData';

// Create an instance of the image plugin
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

// Define tag colors
const tagColors = ['blue', 'green', 'purple', 'yellow', 'orange'];

const Home = () => {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef();
  const [tabs, setTabs] = useState(TabsData);

  const handleDeleteTopic = (tabIndex, topicIndex) => {
    // Delete the selected topic
    const selectedTopic = tabs[tabIndex].topics[topicIndex];
    setSelectedTopic(selectedTopic);
    setShowDeleteConfirmationModal(true);
  };
  
  const handleConfirmDeleteTopic = () => {
    const updatedTabs = [...tabs];
    const tabIndex = updatedTabs.findIndex((tab) => tab.topics.includes(selectedTopic));
    if (tabIndex !== -1) {
      const topicIndex = updatedTabs[tabIndex].topics.findIndex((topic) => topic === selectedTopic);
      if (topicIndex !== -1) {
        updatedTabs[tabIndex].topics.splice(topicIndex, 1);
        setTabs(updatedTabs);
      }
    }
    setShowDeleteConfirmationModal(false);

    // Display success toast message
    toast({
      title: 'Topic Deleted',
      description: 'The topic has been successfully deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
  };  

  const handleAddTopic = () => {
    // Add a new topic
    const newTopic = {
      name: topicName,
      tags: keywords.split(',').map((keyword) => keyword.trim()),
    };
    const updatedTabs = [...tabs];
    updatedTabs[1].topics.push(newTopic); // Add the new topic to the second tab (Custom)
    setTabs(updatedTabs);
    setShowAddTopicModal(false);
    setTopicName('');
    setKeywords('');

    // Display success toast message
    toast({
      title: 'Topic Added',
      description: 'The topic has been successfully added.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
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

  const handleAddImage = () => {
    fileInputRef.current.click();
  };
  
  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const url = event.target.result;
    setImageUrl(url);
    setSelectedImage(url); // Set the selected image URL
    const imagePluginEditorState = imagePlugin.addImage(editorState, url);
    setEditorState(imagePluginEditorState);

    // Display image details in the console
    console.log('Image details:', {
      file: file,
      url: url,
      editorState: imagePluginEditorState,
    });
  };
  reader.readAsDataURL(file);
};

  // Render the tabbed interface
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box p={4} m={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="gray.50">
        <Heading as="h2" size="md" mb={2}>Categories</Heading>
        <Tabs isLazy >
          <Flex alignItems="center" justifyContent="space-between" p={2} borderWidth="1px" borderRadius="md" borderStyle="solid" borderColor="gray.200" flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            <TabList>
              {tabs.map((tab, index) => (
                <Tab key={index} _selected={{ color: 'white', bg: 'blue.400' }} _hover={{ color: 'blue.400', bg: 'gray.300' }} borderWidth="1px" borderRadius="md" borderStyle="solid" borderColor="gray.200" px={3} py={2} w={'150px'}>
                  {tab.name}
                </Tab>
              ))}
            </TabList>
            <Button colorScheme="orange" size="md" rightIcon={<FaPlus />} onClick={() => setShowAddTopicModal(true)} flex={{ base: '1', lg: 'none' }} flexGrow={{ base: '1', lg: 'initial' }} mt={{ base: '5'}} mb={{ base: '5'}}>
              Add topic
            </Button>
          </Flex>
          <TabPanels>
            {tabs.map((tab, tabIndex) => (
              <TabPanel key={tabIndex}>
                <Text mb={5} fontWeight="bold" fontSize={'sm'} ml={7}>Recommended Topics</Text>
                <UnorderedList borderWidth="1px" borderRadius="md" borderStyle="solid" borderColor="gray.200">
                  {tab.topics.map((topic, topicIndex) => (
                    <ListItem
                      key={topicIndex}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      p={2}
                      bg="white"
                      borderRadius="md"
                      mb={4}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor="gray.200"
                      _last={{ mb: 0 }}
                      _hover={{ bg: 'gray.50' }}
                    >
                      <Box flex="1">
                        <Box mb={3}>
                          {topic.name}
                        </Box>
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
                      <Button colorScheme="teal" size="sm" onClick={handleWrite} rightIcon={<FaRegEdit />} _hover={{ backgroundColor: 'teal.600', color: 'white' }} >Write</Button>
                      <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDeleteTopic(tabIndex, topicIndex)} rightIcon={<FaTrash />} _hover={{ backgroundColor: 'red.600', color: 'white' }} >Delete</Button>
                    </ListItem>
                  ))}
                </UnorderedList>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

        {/* Delete confirmation modal */}                      
        <Modal isOpen={showDeleteConfirmationModal} onClose={() => setShowDeleteConfirmationModal(false)}>
          <ModalOverlay />
          <ModalContent bg="white"
            borderRadius="md"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.200">
            <ModalHeader>Delete Topic</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                Are you sure you want to delete the topic ?
              </Text>
              <Text fontWeight="bold" mt={2}>
                {selectedTopic?.name}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleConfirmDeleteTopic}>
                Delete
              </Button>
              <Button variant="ghost" onClick={() => setShowDeleteConfirmationModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Add topic modal */}
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

        {/* Blog editor modal */}                      
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
                <ToolbarButton
                  icon={<FaPlus />}
                  onClick={handleAddImage}
                  label="Add Image"
                />
              </Flex>
              <Box border="1px solid #E2E8F0" borderRadius="md" minHeight="200px" p={2}>
                <Editor
                  editorState={editorState}
                  onChange={handleEditorChange}
                  plugins={[imagePlugin]}
                  placeholder="Write your blog content here..."
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
        <Input type="file"                    
          accept="image/*"                 
          ref={fileInputRef}               
          display="none"                  
          onChange={handleImageUpload}    
        />
      </Box>
    </motion.div>
  );
};

export default Home;