import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { launchAttackAPI, fetchAttackLogsAPI } from '../../api/attackAPI';

interface AttackLog {
  id: string;
  missileType: string;
  targetRegion: string;
  status: string;
  timeToImpact: number;
}

interface AttackState {
  attacks: AttackLog[];
  ammo: Record<string, number>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: AttackState = {
  attacks: [],
  ammo: {},
  status: 'idle',
};

export const launchAttack = createAsyncThunk(
  'attack/launch',
  async ({ missileType, targetRegion }: { missileType: string; targetRegion: string }) => {
    return await launchAttackAPI(missileType, targetRegion);
  }
);

export const fetchAttackLogs = createAsyncThunk(
  'attack/fetchLogs',
  async () => {
    return await fetchAttackLogsAPI();
  }
);

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(launchAttack.fulfilled, (state, action) => {
        state.attacks.push(action.payload);
        const { missileType } = action.payload;
        if (state.ammo[missileType]) {
          state.ammo[missileType] -= 1;
        }
      })
      .addCase(fetchAttackLogs.fulfilled, (state, action) => {
        state.attacks = action.payload;
      });
  },
});

export default attackSlice.reducer;
