# Halloween Trick-or-Treater Counter 🎃

A spooky, interactive single-page application designed to count trick-or-treaters on Halloween night. Project onto your garage door via HDMI projector for a fun, animated display that tracks visitors and candy inventory with zombie-themed animations!

## Quick Start

### Installation

```bash
git clone https://github.com/yourusername/halloween-counter.git
cd halloween-counter

npm install

npm run dev
```

### Production Build

```bash
npm run build

# Preview production build
npm run preview
```

## Usage

### Basic Operation

1. **Start the app**: Navigate to `http://localhost:5173` (or your configured port)
2. **Count visitors**
3. **View fullscreen**: Press `Ctrl+F` to toggle fullscreen mode
4. **Reset counter**: Press `Ctrl+R` to reset (confirmation required)

### URL Parameters

Configure initial values via URL query parameters:

```
http://localhost:5173?currentCount=25&initialCandyCount=200
```

- `currentCount`: Set starting visitor count (default: 0)
- `initialCandyCount`: Set initial candy pieces (default: 100)

### Projector Setup

1. Connect your computer to the projector via HDMI
2. Open the app in a modern browser (Chrome, Firefox, or Edge recommended)
3. Press `Ctrl+F` for fullscreen mode
4. Adjust projector focus and positioning

## Project Structure

```
halloween-counter/
├── src/
│   ├── components/
│   │   ├── Counter.tsx         # Main counter display
│   │   ├── CandyProgress.tsx   # Candy inventory bar
│   │   ├── StatsDisplay.tsx    # Statistics dashboard
│   │   └── ZombieHorde.tsx     # Rive zombie animations
│   ├── hooks/
│   │   ├── useCounter.ts       # Counter logic & persistence
│   │   ├── useQueryParams.ts   # URL parameter handling
│   │   └── useStats.ts         # Statistics calculations
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   ├── App.tsx                 # Main application
│   └── main.tsx                # Entry point
├── public/
│   └── rive/
│       └── zombie.riv          # Zombie animation file
└── package.json
```

## Development

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
```

## Future Enhancements

The architecture supports these planned features:

- [ ] Bluetooth camera trigger integration

## Tips for Halloween Night

1. **Test before dark**: Set up and test your projector while there's still daylight
2. **Use URL parameters**: Bookmark your URL with initial counts for easy recovery
3. **Monitor candy levels**: Watch the progress bar to pace distribution
5. **Have backup plan**: Keep the URL with current count handy in case of refresh

## Credits

- Zombie animations from [Rive Community](https://rive.app/community/files/205-385-zombie-character/)
