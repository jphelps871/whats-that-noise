import { expect, describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TopNav } from '@/components/layout/top-nav'
import { TestSessionWrapper } from '@/tests/utils/wrappers';
import { ToggleCardsOnMapProvider } from '@/providers/toggle-cards-on-map-provider'

describe('TopNav', () => {
  it('shows login when not logged in', () => {
    render(
      <TestSessionWrapper session={null}>
        <ToggleCardsOnMapProvider>
          <TopNav />
        </ToggleCardsOnMapProvider>
      </TestSessionWrapper>
    );
    expect(screen.getByRole('link', { name: /sign in/i })).toBeDefined();
  })

  it('shows logout when logged in', () => {
    render(
      <TestSessionWrapper session={{ user: { name: "Jon Doe" } }}>
        <ToggleCardsOnMapProvider>
          <TopNav />
        </ToggleCardsOnMapProvider>
      </TestSessionWrapper>
    )

    expect(screen.getByRole('button', { name: /sign out/i })).toBeDefined();
  })
})