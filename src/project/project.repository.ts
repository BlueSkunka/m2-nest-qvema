import { AppDataSource } from 'src/datasource';
import { Project } from 'src/entities/project';

const ProjectRepository = AppDataSource.getRepository(Project).extend({

})

export default ProjectRepository;