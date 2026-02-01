import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps, Theme } from '@mui/material/styles';
import { semanticColors } from '../../theme';

export interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SectionNavProps {
  sections: NavSection[];
  sx?: SxProps<Theme>;
}

export function SectionNav({ sections, sx }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  const updateActiveSection = useCallback(() => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const offset = viewportHeight * 0.3; // Consider section active when it's in top 30% of viewport

    let currentSection = sections[0]?.id || '';

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;

      // If the section starts before the offset point, it's the current section
      if (scrollTop + offset >= elementTop) {
        currentSection = section.id;
      }
    }

    setActiveSection(currentSection);
  }, [sections]);

  useEffect(() => {
    // Initial check
    updateActiveSection();

    // Listen to scroll events
    window.addEventListener('scroll', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, [updateActiveSection]);

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 1,
        borderRadius: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        ...sx,
      }}
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;

        return (
          <Tooltip key={section.id} title={section.label} placement="right" arrow>
            <Box
              component="button"
              onClick={() => handleClick(section.id)}
              sx={{
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                bgcolor: isActive ? `${semanticColors.accent.main}20` : 'transparent',
                color: isActive ? semanticColors.accent.main : 'text.secondary',
                '&:hover': {
                  bgcolor: isActive ? `${semanticColors.accent.main}30` : 'action.hover',
                  color: isActive ? semanticColors.accent.main : 'text.primary',
                },
                '& svg': {
                  width: 18,
                  height: 18,
                },
              }}
            >
              {section.icon}
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
