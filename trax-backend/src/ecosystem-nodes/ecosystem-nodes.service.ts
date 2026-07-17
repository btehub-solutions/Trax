import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEcosystemNodeDto, UpdateEcosystemNodeDto } from './dto/ecosystem-node.dto';

export const DEFAULT_NODES = [
  { name: 'Vnicom Solutions (Turnify)', category: 'STARTUP', location: 'Abeokuta', focus: 'HealthTech: clinician workflow & digital health platform', website: 'https://turnify.ng' },
  { name: 'Vant', category: 'STARTUP', location: 'Ogun State', focus: 'InsurTech: climate insurance and underwriting for cooperatives' },
  { name: 'CheckWatt', category: 'STARTUP', location: 'Abeokuta', focus: 'FinTech: electricity payment verification API for discos' },
  { name: 'Gafrotech Hub', category: 'STARTUP', location: 'Abeokuta', focus: 'GreenTech: compostable agro-waste packaging for e-commerce' },
  { name: 'N.E.Y.I Techpreneurship Hub', category: 'STARTUP', location: 'Ogun State', focus: 'EdTech & incubation: startup acceleration and digital skills' },
  { name: 'N.E.Y.I Techpreneurship Hub (Programs)', category: 'HUB', location: 'Ogun State', focus: 'Startup incubator: programmes, funding access, mentorship' },
  { name: 'Ogun State Deep-Tech Incubator', category: 'HUB', location: 'Abeokuta', focus: 'Hardware & climate founders: 120-desk co-working facility' },
  { name: 'IGA Youth Skills Centre', category: 'HUB', location: 'Abeokuta', focus: 'Digital skills: product, data, and engineering placements' },
  { name: 'Federal University of Agriculture, Abeokuta (FUNAAB)', category: 'LAB', location: 'Abeokuta', focus: 'AgriTech, biotechnology, and applied computer science research', website: 'https://funaab.edu.ng' },
  { name: 'Olabisi Onabanjo University (OOU)', category: 'LAB', location: 'Ago-Iwoye', focus: 'Engineering, ICT, and health informatics research', website: 'https://oouagoiwoye.edu.ng' },
  { name: 'Moshood Abiola Polytechnic (MAPOLY)', category: 'LAB', location: 'Abeokuta', focus: 'Applied technology, electronics, and software engineering', website: 'https://mapoly.edu.ng' },
];

@Injectable()
export class EcosystemNodesService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    // Clear old listings so updates to DEFAULT_NODES are written to the database
    await this.prisma.ecosystemNode.deleteMany({});
    for (const node of DEFAULT_NODES) {
      await this.prisma.ecosystemNode.create({ data: node });
    }
    return { message: 'Ecosystem nodes seeded' };
  }

  async create(dto: CreateEcosystemNodeDto) {
    return this.prisma.ecosystemNode.create({ data: dto });
  }

  async findAll() {
    return this.prisma.ecosystemNode.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const node = await this.prisma.ecosystemNode.findUnique({ where: { id } });
    if (!node) throw new NotFoundException(`Ecosystem node ${id} not found`);
    return node;
  }

  async update(id: string, dto: UpdateEcosystemNodeDto) {
    await this.findById(id);
    return this.prisma.ecosystemNode.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.ecosystemNode.delete({ where: { id } });
    return { message: 'Ecosystem node deleted' };
  }
}
