import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { interceptAttackAPI } from '../../api/defenseAPI';
import { defenseDto } from '../../models/Dtos';
import { fetchAttackLogsAPI } from '../../api/attackAPI';

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
  async (dto: defenseDto) => {
    return await interceptAttackAPI(dto);
  }
);

export const fetchPendingAttacks = createAsyncThunk('defense/fetchPending', async () => {
  return await fetchAttackLogsAPI();
});

const defenseSlice = createSlice({
  name: 'defense',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(interceptAttack.fulfilled, (state, action) => {
        const index = state.attacks.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.attacks[index].status = action.payload.status; 
        }
      })
      .addCase(fetchPendingAttacks.fulfilled, (state, action) => {
        state.attacks = action.payload;
      });
  },
});

export default defenseSlice.reducer;
