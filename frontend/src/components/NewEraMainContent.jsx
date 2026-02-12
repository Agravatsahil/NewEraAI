import React, { useContext, useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import FeatureCard from './FeatureCard';
import PrimaryButton from './PrimaryBtn';
import SecondaryButton from './SecondaryBtn';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import taskAutomationBg from '../assets/images/Task Automation bg.png';
import taskAutomationIcon from '../assets/images/Task Automation.svg';
import multiLanguageBg from '../assets/images/bgMulti-language Support.png';
import multiLanguageIcon from '../assets/images/language-circle.svg';
import intelligentAutomationBg from '../assets/images/Intelligent Automation.png';
import intelligentAutomationIcon from '../assets/images/ai-magic.svg';
import developerFriendlyBg from '../assets/images/Developer Friendly.png';
import developerFriendlyIcon from '../assets/images/source-code.svg';
import attachmentIcon from '../assets/images/attachment-02.png';
import micIcon from '../assets/images/mic-01.png';
import sidebarOpenCloseIcon from '../assets/images/sidebar-open-close-icon.svg';
import { AppContext } from '../Context';
import Loader from './Loader';
import Lottie from 'lottie-react';

import { v4 as uuidv4 } from 'uuid';

const NewEraMainContent = ({ isSidebarOpen = true, onOpenSidebar }) => {

  const featureCards = [
    {
      id: 'task-automation',
      title: 'Task Automation',
      description: 'Automates tasks like scheduling and reminders.',
      gradient: 'linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%)',
      bgImage: taskAutomationBg,
      icon: taskAutomationIcon,
      color: '#4873E9',
    },
    {
      id: 'multi-language',
      title: 'Multi-language Support',
      description: 'Communicates clearly to your questions effortlessly.',
      gradient: 'linear-gradient(135deg, #F97316 0%, #FB7185 100%)',
      bgImage: multiLanguageBg,
      icon: multiLanguageIcon,
      color: '#F97316',
    },
    {
      id: 'intelligent-automation',
      title: 'Intelligent Automation',
      description: 'Simplifies repetitive tasks and workflows using AI assistance.',
      gradient: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
      bgImage: intelligentAutomationBg,
      icon: intelligentAutomationIcon,
      color: '#A855F7',
    },
    {
      id: 'developer-friendly',
      title: 'Developer Friendly',
      description: 'Creates clean code snippets whenever you need them.',
      gradient: 'linear-gradient(135deg, #22C55E 0%, #2DD4BF 100%)',
      bgImage: developerFriendlyBg,
      icon: developerFriendlyIcon,
      color: '#22C55E',
    },
  ];

  const promptSuggestions = [
    'Tell me a fun fact!',
    'Help me brainstorm an idea',
    'Write a short story',
    'Generate a creative caption',
  ];

  const [inputValue, setInputValue] = useState("");
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const typingTimeoutRef = useRef(null);

  const PROMPT_LIMIT = 3;
  const [promptsUsed, setPromptsUsed] = useState(0);
  const userEmail = (typeof window !== 'undefined' && localStorage.getItem('newera_user_email')) || 'guest';
  const promptLimitStorageKey = `newera_prompt_count:${userEmail}`;

  useEffect(() => {
    const stored = Number(localStorage.getItem(promptLimitStorageKey) || 0);
    setPromptsUsed(Number.isFinite(stored) ? stored : 0);
  }, [promptLimitStorageKey]);

  // Typing effect function
  const typeText = (text, callback) => {
    setIsTyping(true);
    setTypingText("");
    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        setTypingText(text.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeCharacter, 20);
      } else {
        setIsTyping(false);
        if (callback) callback();
      }
    };

    typeCharacter();
  };

  const { prompt, setPrompt,
    reply, setReply,
    currentThreadId, setCurrentThreadId,
    isNewChat, setIsNewChat,
    prevChatId, setPrevChatId
  } = useContext(AppContext);

  const getReply = async () => {
    if (promptsUsed >= PROMPT_LIMIT) return;
    const prompt = inputValue;
    if (!prompt.trim()) return;

    setIsLoading(true);

    setPrompt(prompt);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };

    try {
      const response = await fetch(`http://localhost:8080/api/threads/${currentThreadId}/messages`, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || 'Request failed');
      }
      // console.log("Response:", data);

      // Add user message immediately
      setPrevChatId(prev => {
        const newMessages = [...(prev.messages || []), { role: 'user', content: prompt }];
        const updated = { ...prev, messages: newMessages };
        // console.log('After adding user message:', updated);
        return updated;
      });
      setInputValue("");

      setPromptsUsed(prev => {
        const next = Math.min(PROMPT_LIMIT, prev + 1);
        localStorage.setItem(promptLimitStorageKey, String(next));
        return next;
      });

      // Switch to chat view if this is the first message
      if (isNewChat) {
        setIsNewChat(false);
      }

      // Add empty AI message for typing effect
      setPrevChatId(prev => {
        const newMessages = [...(prev.messages || []), { role: 'assistant', content: '' }];
        const updated = { ...prev, messages: newMessages };
        // console.log('After adding empty AI message:', updated);
        return updated;
      });

      // Start typing effect for AI reply
      typeText(data.reply, () => {
        // Update with AI response
        setPrevChatId(prev => {
          const newMessages = [...(prev.messages || [])];
          newMessages[newMessages.length - 1] = { role: 'assistant', content: data.reply };
          const updated = { ...prev, messages: newMessages };
          // console.log('After AI response:', updated);
          return updated;
        });
      });

      setReply(data.reply);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }


  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Add pulse animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 60%, 100% { opacity: 0.3; }
        30% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between' ,
        py: { xs: 2, md: 2 },
        px: { xs: 2, md: 2 },
        bgcolor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E5E7EB',
        boxShadow: '0px 8px 10px -10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {!isSidebarOpen && typeof onOpenSidebar === 'function' && (
        <Box
          sx={{
            position: 'absolute',
            top: 18,
            left: 18,
          }}
        >
          <IconButton
            size="small"
            onClick={onOpenSidebar}
            sx={{
              width: 40,
              height: 40,

              border: '1px solid #EFEFEF',

            }}
          >
            <Box
              component="img"
              src={sidebarOpenCloseIcon}
              alt="Open sidebar"
              sx={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Box>
      )}

      {isNewChat && (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 760,
              mx: 'auto',
              mb: { xs: 2.5, md: 3 },
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: 26, md: 32 },
                mb: 0,
                color: '#111827',
              }}
            >
              What Can{' '}
              <Box component="span" sx={{ color: '#FFAD00' }}>
                NewEra AI
              </Box>{' '}
              <Box
                component="span"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontWeight: 700,
                }}
              >
                Help You With?
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 13, md: 15 },
                color: '#6B7280',
              }}
            >
              Ask questions, get insights, and unlock smarter decisions in seconds.
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: 1320,
              mx: 'auto',
              display: 'grid',
              gap: { xs: 2, md: 3 },
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(4, minmax(0, 1fr))',
              },
            }}
          >
            {featureCards.map((card) => (
              <FeatureCard
                key={card.id}
                title={card.title}
                description={card.description}
                gradient={card.gradient}
                bgImage={card.bgImage}
                icon={card.icon}
                color={card.color}
              />
            ))}
          </Box>
        </Box>
      )}
  
      {!isNewChat && (
        <Box sx={{
          maxWidth: '900px',
          width: '100%',
          height: { xs: '300px', md: '600px' },
          overflowY: 'auto',
          px: { xs: 2, md: 3 },
          mb: 2,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '10px',
            '&:hover': {
              background: '#a8a8a8',
            },
          },
        }}>
          {/* Chat History */}
          {prevChatId.messages?.map((message, index) => (
            <React.Fragment key={index}>
              {message.role === 'user' ? (
                /* User Message */
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: '#111827',
                      color: '#FFFFFF',
                      px: 3,
                      py: 2,
                      borderRadius: '20px 20px 4px 20px',
                      wordBreak: 'break-word',
                    }}
                  >
                    <Typography variant="body1" sx={{ fontSize: '15px', lineHeight: 1.5 }}>
                      {message.content}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                /* AI Reply */
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      maxWidth: '70%',
                      bgcolor: '#F3F4F6',
                      color: '#111827',
                      px: 3,
                      py: 2,
                      borderRadius: '20px 20px 20px 4px',
                      wordBreak: 'break-word',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    {isTyping && message.role === 'assistant' && index === prevChatId.messages?.length - 1 && !message.content ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" sx={{ fontSize: '15px', lineHeight: 1.5 }}>
                          {typingText}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: '#6B7280', animation: 'pulse 1.4s infinite' }} />
                          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: '#6B7280', animation: 'pulse 1.4s 0.2s infinite' }} />
                          <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: '#6B7280', animation: 'pulse 1.4s 0.4s infinite' }} />
                        </Box>
                      </Box>
                    ) : (
                      <ReactMarkdown
                        components={{
                          code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                  borderRadius: '8px',
                                  fontSize: '14px',
                                  margin: '8px 0',
                                }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <Box
                                component="code"
                                sx={{
                                  bgcolor: '#E5E7EB',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: '4px',
                                  fontSize: '13px',
                                  fontFamily: 'monospace',
                                }}
                                {...props}
                              >
                                {children}
                              </Box>
                            );
                          },
                          p: ({ children }) => (
                            <Typography variant="body1" sx={{ fontSize: '15px', lineHeight: 1.5, mb: 1 }}>
                              {children}
                            </Typography>
                          ),
                          ul: ({ children }) => (
                            <Box component="ul" sx={{ pl: 3, mb: 1 }}>
                              {children}
                            </Box>
                          ),
                          ol: ({ children }) => (
                            <Box component="ol" sx={{ pl: 3, mb: 1 }}>
                              {children}
                            </Box>
                          ),
                          li: ({ children }) => (
                            <Typography component="li" variant="body1" sx={{ fontSize: '15px', lineHeight: 1.5, mb: 0.5 }}>
                              {children}
                            </Typography>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </Box>
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      )}

      <Box sx={{ width: '100%' }}>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader />
          </Box>
        )}


        {isNewChat && (
          <Box
            sx={{
              width: '100%',
              maxWidth: 900,
              mx: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1.25,
              mb: { xs: 2, md: 2.5 },
              mt: { xs: 3, md: 4 },
            }}
          >
            {promptSuggestions.map((label) => (
              <SecondaryButton
                key={label}
                sx={{
                  borderRadius: 999,
                  px: 2.5,
                  py: 0.9,
                  fontSize: 13,
                }}
              >
                {label}
              </SecondaryButton>
            ))}
          </Box>
        )}

        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            mx: 'auto',
            mb: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, fontWeight: 600 }}>
            {`${promptsUsed}/${PROMPT_LIMIT}`}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: 12, fontWeight: 600 }}>
            Prompt limit
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            mx: 'auto',
            bgcolor: '#F9FAFB',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
          }}
        >
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Ask me anything..."
            variant="outlined"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                getReply();
              }
            }}
            disabled={isLoading || promptsUsed >= PROMPT_LIMIT}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                bgcolor: '#FFFFFF',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)',
                '& fieldset': {
                  borderColor: '#E5E7EB',
                },
              },
            }}
          />

          <Box
            sx={{

              px: { xs: 1.5, md: 2 },
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  bgcolor: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '@media (hover: hover)': {
                    '&:hover': {
                      bgcolor: '#EDEFF2',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={attachmentIcon}
                  alt="Attach"
                  sx={{ width: 18, height: 18, objectFit: 'contain' }}
                />
              </Box>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '999px',
                  bgcolor: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  '@media (hover: hover)': {
                    '&:hover': {
                      bgcolor: '#EDEFF2',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={micIcon}
                  alt="Voice"
                  sx={{ width: 18, height: 18, objectFit: 'contain' }}
                />
              </Box>
            </Box>

            <PrimaryButton
              onClick={getReply}
              disabled={isLoading || promptsUsed >= PROMPT_LIMIT}
              sx={{
                minWidth: 0,
                width: 44,
                height: 44,
                borderRadius: '999px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 18, lineHeight: 1 }}>↑</Typography>
            </PrimaryButton>
          </Box>
        </Box>

        <Box sx={{
          mt: 2, textAlign: 'center'

        }}>
          <Typography
            variant="caption"
            sx={{ color: '#9CA3AF', fontSize: 11, textAlign: 'center' }}
          >
            Free Research Preview. NewEra AI may generate inaccurate information.
            NewEra v1.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NewEraMainContent;
