import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { interceptAttackAPI, fetchPendingAttacksAPI } from '../../api/defenseAPI';

interface AttackLog {
  id: string;
  missileType: string;
  targetRegion: string;
  status: string;
  timeToImpact: number;
}

interface DefenseState {
  attacks: AttackLog[];
  ammo: Record<string, number>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: DefenseState = {
  attacks: [],
  ammo: {},
  status: 'idle',
};

export const interceptAttack = createAsyncThunk(
  'defense/intercept',
  async (attackId: string) => {
    return await interceptAttackAPI(attackId);
  }
);

export const fetchPendingAttacks = createAsyncThunk('defense/fetchPending', async () => {
  return await fetchPendingAttacksAPI();
});

const defenseSlice = createSlice({
  name: 'defense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle intercept attack
      .addCase(interceptAttack.fulfilled, (state, action) => {
        const index = state.attacks.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.attacks[index].status = action.payload.status; // Update status to intercepted/handled
        }
      })
      // Fetch attacks from the API
      .addCase(fetchPendingAttacks.fulfilled, (state, action) => {
        state.attacks = action.payload; // Directly assign all attacks to the array
      });
  },
});

export default defenseSlice.reducer;
