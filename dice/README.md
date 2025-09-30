# Dice Notation Format

A format for expressing dice rolls with various modifiers and flags.

## Basic Syntax

```
[<rolls>x][count]d<size>[flags][+/-terms]
```

- **count**: Number of dice (default: 1)
- **size**: Die size (minimum 2), e.g., d6, d20, d100
- **flags**: Optional modifiers (order doesn't matter)
  - `a[n]` - Advantage (roll n (default 1) extra dice, drop lowest)
  - `d[n]` - Disadvantage (roll n (default 1) extra dice, drop highest)
  - `x` - No explosion (disable default explosion)
  - `!` - Explode all (any die can explode, not just primary)
  - `v` - Vicious (roll an extra die on crit)
  - `b` - Brutal (highest die becomes primary)
  - `c` - Cheat (treat non-miss as critical hit)
  - `m<n>` - Miss threshold (roll of n or below is a miss)
  - `^<n|-n>` - Modify primary die by +n or -n
- **+/-terms**: Additional dice groups or numbers

## Examples

### Simple rolls

- `d20` – Single d20
- `2d6` – Two d6 dice
- `3d8+5` – Three d8 plus 5
- `1d6+1d8` – Multiple dice types

### Advantage/Disadvantage

- `2d6a` – Roll 3d6, drop lowest (advantage 1)
- `3d8a2` – Roll 5d8, drop 2 lowest
- `2d6d` – Roll 3d6, drop highest (disadvantage 1)
- `3d4d2+6` – Roll 5d4, drop 2 highest, plus 6

### Explosion (re-rolling max values)

- `d8` – Explodes on max value by default
- `2d6x` – No explosion
- `3d6!` – Any die can explode (not just primary)

### Combat modifiers

- `1d8v` – Vicious: explode then re-roll 1s
- `3d6b` – Brutal: highest becomes primary
- `1d6m2+2` – Miss on 2 or below
- `1d4c` – Cheat: treat non-1 as critical
- `1d6m0c` – Always crit: combine miss on 0 (never) and cheat

### Primary die modifier

- `1d6^2` – Add 2 to primary die
- `1d6^-2` – Subtract 2 from primary die
- `1d8^8` – Set primary to max (auto-crit)

### Complex examples

- `3d8a2bv` – 3d8 with advantage 2, brutal, vicious
- `2d10!b^2` – 2d10, all explode, brutal, primary +2

## Repeating

```
<n>x<expression>
```

Repeat the entire expression <n> times. Each roll may miss or crit independently.

- `2x1d6+5` – Roll 1d6+5 twice
- `3xd20` – Roll d20 three times

## Whitespace

Whitespace may be added between groups and operators.

- `2x 1d10a + 3` - equivalent to `2x1d6a+5`

## Character Stats

When defining rolls for a character, you may use stat modifiers instead of
numbers:

- `1d6+STR` – d6 plus strength
- `2d6a+DEX` – 2d6 advantage plus dexterity
- `1d8+1d6+INT` – Multiple dice plus intelligence

Valid stats: `STR`, `DEX`, `INT`, `WIL`, `LVL`

Note: Cannot mix stat and number modifiers in the same expression.
